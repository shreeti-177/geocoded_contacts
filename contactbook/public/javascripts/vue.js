// new Vue instance
new Vue({
    el: "#contactPage",
    data: {
        headers:["Name","Address","Email","Phone","Contact by Mail","Contact by Email","Contact by Phone"], /** Table headers */
        contacts: [], /** Database Contact list */
        contact: {}, /** Contact in use */
        state: "Read", /** Page state */
        substate: "" /**Substate for create/update */
    },
    // created() {
    //     // initMap();  
    //     Mark(this.contacts);
    // },

    mounted() {
        let v = this;
        v.state = "Read";
        v.contacts = renderVal;
        initMap();
    },

    updated() {
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
            // initMap();
        //Mark(this.contacts);
            // this.state = "Read"; /**set state back to read after updating database */
        },

        //**********************Deletes a contact from the database********************************
        DeleteContact: async function (id) {
            await axios.post("/contacts/"+id+"/delete", { contactId: id });
            console.log("reached here");
            window.location.reload(); /**reload page after deleting to show the updated list */
            // this.state = "Delete";
        },

        //**********************Displays the contact list in the event that the user cancels any operation********************************
        Cancel: function () {
            this.state = "Read";
        }

    }

});
