import { Component } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { OnInit } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { TextFile } from "./text-file.model";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  constructor(public cookie: CookieService, public toastr: ToastrService) {}
  files: TextFile[];
  text: string;
  saved: boolean;
  views: number;
  fileName: string;
  fileChosen: boolean;
  creatingFile: boolean;
  createdFileName: string;

  ngOnInit() {
    this.createdFileName = "Untitled";
    if (!this.cookie.get("notepad-files"))
      this.cookie.set("notepad-files", "[]");
    this.fileChosen = false;
    this.files = JSON.parse(this.cookie.get("notepad-files"));
    this.creatingFile = false;
    if (this.cookie.get("views")) {
      this.cookie.set(
        "views",
        JSON.stringify(JSON.parse(this.cookie.get("views")) + 1)
      );
      this.views = JSON.parse(this.cookie.get("views"));
    } else {
      this.cookie.set("views", "1");
      this.views = JSON.parse(this.cookie.get("views"));
    }
  }

  saveText() {
    this.getFileByName(this.fileName).text = this.text;
    this.saveFiles();
    this.saved = true;
    this.toastr.info(`Successfully saved file ${this.fileName}`, "Saved file");
  }
  fileClicked(name: string) {
    this.fileChosen = true;
    this.fileName = name;
    this.text = this.getFileByName(name).text;
    this.saved = true;
  }

  getFileByName(name: string) {
    for (let file of this.files) if (file.name === name) return file;
  }

  addFile(name: string) {
    this.creatingFile = false;
    this.createdFileName = "Untitled";
    if (!this.getFileByName(name)) {
      this.files.push({ name: name, text: "" });
      this.fileClicked(name);
      this.saveFiles();
      this.toastr.success("Created file " + name, "Success");
    } else
      this.toastr.error(
        "File already exists! Please choose another name.",
        "Error"
      );
  }

  saveFiles() {
    this.cookie.set("notepad-files", JSON.stringify(this.files));
  }

  deleteFile(name: string) {
    this.files.splice(this.files.findIndex(file => file.name === name), 1);
    this.saveFiles();
    this.toastr.info(`Successfully deleted file ${name}`, "Deleted file");
    if (this.fileName === name) this.fileChosen = false;
  }

  closeEditor() {
    if (this.saved) this.fileChosen = false;
    else if (confirm(`Are you sure? ${this.fileName} has unsaved changes`))
      this.fileChosen = false;
  }
}
