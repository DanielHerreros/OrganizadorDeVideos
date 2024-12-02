function fillInUpdateUserForm(userData:any){//TO-DO: quitar any
    (document.querySelector("#name-field") as HTMLInputElement).value = userData.name;
    (document.querySelector("#surname-field") as HTMLInputElement).value = userData.first_surname;
    (document.querySelector("#username-field") as HTMLInputElement).value = userData.userName;
    (document.querySelector("#password-field") as HTMLInputElement).value = userData.password;
    (document.querySelector("#email-field") as HTMLInputElement).value = userData.email;
}

document.addEventListener("DOMContentLoaded", async () => {
    const pathname = window.location.pathname;//TO-DO: hacerlo con params y window.locator.search
    const id = parseInt(pathname.split('/').pop() as string);  
    if (!isNaN(id)){
        const userData = await fetch(`http://localhost:3000/api/v1/users/${id}`);
        const userDataJson = await userData.json();
        fillInUpdateUserForm(userDataJson[0]);
        document.querySelector("#userForm")?.setAttribute("action", `/api/v1/users/${id}`);
    }
});