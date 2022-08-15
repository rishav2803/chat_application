import React from "react";

const ContactsContext = React.createContext({
    isVisible: '',
    onRecentContact: () => { },
    onActiveContact: () => { }
})


export default ContactsContext;
