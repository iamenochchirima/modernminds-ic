import Principal "mo:base/Principal";
import Int "mo:base/Int";

module {

    // Users
    public type User = {
        id : Principal;
        is_anonymous : Bool;
        user_body : ?UserBody;
        created_at : Int;
    };

    type UserBody = {
        first_name : Text;
        last_name : Text;
        email : Text;
        country : Text;
        genger : Text;
        is_admin : Bool;
        is_verified : Bool;
        is_email_verified : Bool;
        is_staff : Bool;
        is_subscribed : Bool;
        is_newsletter_sub : Bool;
        is_active : Bool;
    };

    // Articles
    public type Article = {
        id : Text;
        title : Text;
        issue : Text;
        author : Text;
        cover_image : Text;
        content : [Section];
        category : Text;
        slug : Text;
        editor : Text;
        is_editor_note : Bool;
        is_todays_pick : Bool;
        is_top_story : Bool;
        is_special : Bool;
        is_archived : Bool;
        is_draft : Bool;
        status : Text;
        created_at : Int;
    };

    type Section = {
        body : Text;
        img_url : Text;
        img_caption : Text;
        img_credit : Text;
        img_is_left : Bool;
        img_is_center : Bool;
        img_is_right : Bool;
    };

    public type Category = {
        id : Text;
        name : Text;
        cover_image : Text;
        slug : Text;
        is_active : Bool;
        created_at : Int;
    };

    // Issues
    // public type Issue = {
    //     id: Text;
    //     name: Text;
    //     cover_image: Text;
    //     slug: Text;
    //     is_active: Bool;
    //     created_at: Int;
    // };

    public type Role = {
        #owner;
        #admin;
        #staff;
        #authorized;
    };

    public type Permission = {
        #assign_role;
        #lowest;
    };

};
