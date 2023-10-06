import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { DataService } from '../services/data.service';
import { User } from '../../utils/interfaces/user.interface';
import * as CryptoJS from 'crypto-js';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './users.component.html',
  providers: [MessageService]
})
export class UsersComponent implements OnInit {

    @ViewChild('formElement') formElement: any;
    @ViewChild('dt') table?: Table ;
    createUserDialog: boolean = false;
    editUserDialog: boolean = false;

    deleteUserDialog: boolean = false;

    deleteUsersDialog: boolean = false;

    public createUserForm!: FormGroup;
    public editUserForm!: FormGroup;

    users: any[] = [];

    user: any = {};

    selectedUsers: any[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor( private messageService: MessageService, private dataService: DataService,
        private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.buildForm();

        this.dataService.getUsers().subscribe((res: any)=>{
            console.log(res);
            this.users = res.response;
        });

        this.cols = [
            { field: 'user', header: 'User' },
            { field: 'price', header: 'Price' },
            { field: 'category', header: 'Category' },
            { field: 'rating', header: 'Reviews' },
            { field: 'inventoryStatus', header: 'Status' }
        ];
    }

    private buildForm(): void {
        this.createUserForm = this.formBuilder.group({
            name: ['', Validators.required],
            password: ['', Validators.required],
            email: ['', Validators.required],
        });
        this.editUserForm = this.formBuilder.group({
            name: ['', Validators.required],
            email: ['', Validators.required],
            id: ['', Validators.required],
        });
    }

    openNew() {
        this.user = {};
        this.submitted = false;
        this.createUserDialog = true;
    }

    deleteSelectedUsers() {
        this.deleteUsersDialog = true;
    }

    editUser(user: any) {
        this.user = { ...user };
        this.editUserDialog = true;
    }

    deleteUser(user: any) {
        this.deleteUserDialog = true;
        this.user = { ...user };
    }

    confirmDeleteSelected() {
        this.deleteUsersDialog = false;
        this.users = this.users.filter(val => !this.selectedUsers.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Users Deleted', life: 3000 });
        this.selectedUsers = [];
    }

    confirmDelete() {
        this.deleteUserDialog = false;
        this.users = this.users.filter(val => val.id !== this.user.id);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000 });
        this.user = {};
    }

    hideCreateDialog() {
        this.createUserDialog = false;
        this.submitted = false;
    }

    hideEditDialog() {
        this.editUserDialog = false;
        this.submitted = false;
    }

    saveUser() {
        this.dataService.createUser(this.createUserForm.value).subscribe({
            next: (res) => {
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Usuario creado con exito!', life: 3000 });
            },
            error:() => {
                this.messageService.add({ severity: 'error', summary: 'Successful', detail: 'Algo salio mal!', life: 3000 });
            }
        });
        this.createUserDialog = false;
    }

    updateUser(){
        console.log(this.editUserForm.value)
        this.dataService.editUser(this.editUserForm.value).subscribe({
            next: (res) => {
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Usuario actualizado con exito!', life: 3000 });
            },
            error:() => {
                this.messageService.add({ severity: 'error', summary: 'Successful', detail: 'Algo salio mal!', life: 3000 });
            }
        });
        this.editUserDialog = false;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
