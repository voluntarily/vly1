// TODO - Translate and verify existing translations.

export default {
  locale: 'mi',
  messages: {
    // header labels
    siteTitle: 'Voluntari.ly',
    // menu labels
    switchLanguage: 'Whakawhiti Reo',

    // general buttons
    submit: 'Haere',
    cancel: 'Whakakore',

    // post actions
    createNewPost: 'Hanga hou tuhinga',
    addPost: 'Tāpiri tuhinga',
    deletePost: 'Tango tuhinga',
    // post field labels
    twitterMessage: 'Kei runga i Twitter',
    by: 'By',
    authorName: 'Kaituhi',
    postTitle: 'Tuhinga taitara',
    postContent: 'Tuhinga Content',
    comment: `tangata {name} {value, plural,
    	  =0 {does not have any comments}
    	  =1 {has # comment}
    	  other {has # comments}
    	}`,
    HTMLComment: `tangata <b style='font-weight: bold'>{name} </b> {value, plural,
    	  =0 {does not have <i style='font-style: italic'>any</i> comments}
    	  =1 {has <i style='font-style: italic'>#</i> comment}
    	  other {has <i style='font-style: italic'>#</i> comments}
    	}`,
    nestedDateComment: `tangata {name} {value, plural,
    	  =0 {does not have any comments}
    	  =1 {has # comment}
    	  other {has # comments}
    	} as of {date}`,

    // organisation field labels
    orgName: 'Whakahaere Ingoa',
    orgAbout: 'About Whakahaere',

    // org actions
    createNewOrg: 'Hanga hou whakahaere',
    addOrg: 'Tāpiri whakahaere',
    deleteOrg: 'Tango whakahaere',

    // Op list page
    opportunities: 'Mea angitu',

    // opportunity field labels
    opName: 'Title',
    opAbout: 'Description ',

    // op actions
    createNewOp: 'Hanga hou mea angitu',
    addOp: 'Hou mea angitu',
    deleteOp: 'Tango mea angitu',

    // activity field labels
    actName: 'Taitara',
    actAbout: 'Whakaahua ',

    // op actions
    createNewAct: 'Hanga hou mahi',
    addAct: 'Hou mahi',
    deleteAct: 'Tango mahi',

    // person field labels
    personName: 'Ingoa',
    personEmail: 'Email',
    personRole: 'Mahi',  // e.g teacher, volunteer, admin, support
    // person actions
    createNewPerson: 'Hanga hou tangata',
    addPerson: 'Tāpiri tangata',
    deletePerson: 'Tango tangata',
  },
};
