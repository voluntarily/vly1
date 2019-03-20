export default {
  locale: 'en',
  messages: {
    // header labels
    siteTitle: 'Voluntari.ly',
    // menu labels
    switchLanguage: 'Switch Language',

    // general buttons
    submit: 'Submit',
    cancel: 'Cancel',

    // post actions
    createNewPost: 'Create new post',
    addPost: 'Add Post',
    deletePost: 'Delete Post',
    // post field labels
    twitterMessage: 'We are on Twitter',
    by: 'By',
    authorName: 'Author\'s Name',
    postTitle: 'Post Title',
    postContent: 'Post Content',
    comment: `user {name} {value, plural,
    	  =0 {does not have any comments}
    	  =1 {has # comment}
    	  other {has # comments}
    	}`,
    HTMLComment: `user <b style='font-weight: bold'>{name} </b> {value, plural,
    	  =0 {does not have <i style='font-style: italic'>any</i> comments}
    	  =1 {has <i style='font-style: italic'>#</i> comment}
    	  other {has <i style='font-style: italic'>#</i> comments}
    	}`,
    nestedDateComment: `user {name} {value, plural,
    	  =0 {does not have any comments}
    	  =1 {has # comment}
    	  other {has # comments}
    	} as of {date}`,

    // org field labels
    orgName: 'Organisation Name',
    orgAbout: 'About Organisation',

    // org actions
    createNewOrg: 'Create new organisation',
    addOrg: 'Add Org',
    deleteOrg: 'Delete organisation',

    // Op list page
    opportunities: 'Opportunities',

    // op field labels
    opName: 'Title',
    opAbout: 'Description ',

    // op actions
    createNewOp: 'Create new Opportunity',
    addOp: 'New Opportunity',
    deleteOp: 'Delete Opportunity',

    // act field labels
    actName: 'Title',
    actAbout: 'Description ',

    // op actions
    createNewAct: 'Create new activity',
    addAct: 'New activity',
    deleteAct: 'Delete activity',

    // person actions
    createNewPerson: 'Create new person',
    addPerson: 'Add Person',
    deletePerson: 'Delete Person',
    // person field labels
    personName: 'Name',
    personEmail: 'Email',
    personRole: 'Role',

  },
};
