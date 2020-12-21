new Vue({
    el: "#contactPage",
    data: {
        headers:["Name","Address","Email","Phone","Contact by Mail","Contact by Email","Contact by Phone"],
        contacts: [],
        contact: {},
        state: "Read",
        substate: ""
    },
    // created() {
        
    // },

    mounted() {
        let v = this;
        v.state = "Read";
        v.contacts = renderVal;
        initMap(v.contacts);
    },

    updated() {
        initMap();
    },

    methods: {
        Locate: function (contact) {
            Recenter(contact);
        },

        ShowForm: function () {
            this.state = "CreateUpdate";
            this.substate = "Create";
            this.contact = {};
        },

        
        EditForm: function (contact) {
            this.state = "CreateUpdate";
            this.substate = "Update";
            this.contact = contact;
        },

        PostContact: async function () {
            result = await axios.post("/contacts", { contact: this.contact });
            this.contacts = result.data.newList;
            this.state = "Read";
            },

        DeleteContact: async function (id) {
            await axios.post("/contacts/"+id+"/delete", { contactId: id });
            console.log("reached here");
            window.location.reload();
            // this.state = "Delete";
        },

        Cancel: function () {
            this.state = "Read";
        }

    }

});
