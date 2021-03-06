import { Component, OnInit } from '@angular/core';
import {User} from '../../model/model.user';
import { UserService } from '../../services/user.service';
import { UploadItem, Uploader } from 'angular-http-file-upload';
import {UtilisateurApi} from '../../shared/sdk';
import {Utilisateur} from '../../shared/sdk/models';

@Component({
  selector: 'app-import-professeurs',
  templateUrl: './import-professeurs.component.html',
  styleUrls: ['./import-professeurs.component.scss']
})
export class ImportProfesseursComponent implements OnInit {

  administrateur: boolean;
  currentUser: User;
  fileContent;

  constructor(private userService: UtilisateurApi, public utilisateurService: UserService,
    public uploaderService: Uploader) {
   }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.currentUser = this.userService.getCachedCurrent();
      if (this.currentUser.privilege == 'Administrateur'){
          this.administrateur = true;
    }
  }

  submit() {
    const uploadedFile = (<HTMLInputElement>window.document.
      getElementById('upload_file_selection')).files[0];
    const uploadedItem = new UploadItem();
    uploadedItem.url = this.getUploadUrl();
    uploadedItem.file = uploadedFile;

    this.uploaderService.onSuccessUpload = (item, response, status, headers) => {
          console.log('Fichier importé avec succès');
    };
    this.uploaderService.onErrorUpload = (item, response, status, headers) => {
          console.log('Erreur d\'importation de fichier');
    };
    this.uploaderService.upload(uploadedItem);
  }

  getUploadUrl(){
    return this.utilisateurService.getImportTeachersURL(4);
  }

  

}
