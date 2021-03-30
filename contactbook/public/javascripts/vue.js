// new Vue instance
new Vue({
    el: "#contactPage",
    data: {
        headers: ["Name", "Address", "Email", "Phone", "Contact by Mail", "Contact by Email", "Contact by Phone"], /** Table headers */
        contacts: [], /** Database Contact list */
        contact: {}, /** Contact in use */
        state: "Read", /** Page state */
        substate: "", /**Substate for create/update */
        firstkey: "",
        lastkey:""
    },



    mounted() {
        let v = this;
        v.state = "Read";
        v.contacts = renderVal;
        initMap();
        Mark(v.contacts);
        // console.log(v.contacts);
    },

    updated() {
        // console.log(this.contacts);
        Mark(this.contacts);
    },

    methods: {   

        //**********************Locates the contact in the map********************************
        Locate: function (contact) {
            Recenter(contact);
        },
       
        //**********************Shows SPA form for Create/Update********************************
        ShowForm: function () {
            this.state = "CreateUpdate";
            this.substate = "Create";
            this.contact = {};
        },

        //**********************Edits existing contact form to Update and save changes********************************
        EditForm: function (contact) {
            this.state = "CreateUpdate";
            this.substate = "Update";
            this.contact = contact;
        },

        //**********************Posts new/updated contacts to database********************************
        PostContact: async function () {
            result = await axios.post("/contacts", { contact: this.contact });
            this.contacts = result.data.newList;
            Mark(this.contacts);
            this.state = "Read"; /**set state back to read after updating database */
        },

        //**********************Deletes a contact from the database********************************
        DeleteContact: async function (id) {
            await axios.post("/contacts/"+id+"/delete", { contactId: id });
            window.location.reload(); /**reload page after deleting to show the updated list */
            // this.state = "Delete";
        },

        //**********************Displays the contact list in the event that the user cancels any operation********************************
        Cancel: function () {
            this.state = "Read";
        },

        SearchFirst: function (event) {
            console.log(this.firstkey);
            let v = this;

            for (index in v.contacts) {
                const contact = v.contacts[index];
                if ((contact.firstName).includes(event.key)) {
                    console.log(contact.firstName);
                }
                //     event.key.toUpperCase();

                // const con = (v.contacts[contact]);
                // console.log(con.firstName);
                // const conFilter = con.firstName.toUpperCase();
                // if (conFilter.includes(event.key)) {
                //     console.log(con.firstName);
                //     // this.contacts = con;
                // }
                // if (contact.firstName.includes(event.key)) {
                //     this.contacts = contact;
                // }
            }
            // let v = this;
            // searchkey = v.searchkey;
            // console.log(v.searchkey);
            // // for (contact in v.contacts) {
            //     console.log(contact);
            // }
            
        }


    }

});
