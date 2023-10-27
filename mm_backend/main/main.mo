import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Text "mo:base/Text";
import TrieMap "mo:base/TrieMap";
import Iter "mo:base/Iter";
import AssocList "mo:base/AssocList";
import List "mo:base/List";
import Error "mo:base/Error";
import Types "types";

shared ({ caller = initializer }) actor class MordernMinds() = this {

  type User = Types.User;
  type Article = Types.Article;
  type Category = Types.Category;
  type Role = Types.Role;
  type Permission = Types.Permission;

  private stable var _stableUsers : [(Principal, User)] = [];
  private stable var _stableArticles : [(Text, Article)] = [];
  private stable var _stableCategories : [(Text, Category)] = [];

  var users = TrieMap.TrieMap<Principal, User>(Principal.equal, Principal.hash);
  var articles = TrieMap.TrieMap<Text, Article>(Text.equal, Text.hash);
  var categories = TrieMap.TrieMap<Text, Category>(Text.equal, Text.hash);

  // Access Control
  private stable var roles : AssocList.AssocList<Principal, Role> = List.nil();
  private stable var role_requests : AssocList.AssocList<Principal, Role> = List.nil();

  system func preupgrade() {
    _stableUsers := Iter.toArray(users.entries());
    _stableArticles := Iter.toArray(articles.entries());
    _stableCategories := Iter.toArray(categories.entries())
  };

  system func postupgrade() {
    users := TrieMap.fromEntries<Principal, User>(_stableUsers.vals(), Principal.equal, Principal.hash);
    articles := TrieMap.fromEntries<Text, Article>(_stableArticles.vals(), Text.equal, Text.hash);
    categories := TrieMap.fromEntries<Text, Category>(_stableCategories.vals(), Text.equal, Text.hash)
  };

  // -----------------------------------------------------Users-----------------------------------------------------------------------
  public shared func createUser(args : User) : async () {
    users.put(args.id, args)
  };

  public shared query func getUser(arg : Principal) : async Result.Result<User, Text> {
    switch (users.get(arg)) {
      case (?user) {
        return #ok(user)
      };
      case (null) {
        return #err("User not found")
      }
    }
  };

  public shared query func getAllUsers() : async [User] {
    return Iter.toArray(users.vals())
  };

  public shared func updateUser(args : User) : async () {
    users.put(args.id, args)
  };

  public shared func deleteUser(arg : Principal) : async () {
    users.delete(arg)
  };

  // -----------------------------------------------------Articles-----------------------------------------------------------------------

  public shared func createArticle(args : Article) : async () {
    articles.put(args.id, args)
  };

  public shared query func getArticle(arg : Text) : async Result.Result<Article, Text> {
    switch (articles.get(arg)) {
      case (?article) {
        return #ok(article)
      };
      case (null) {
        return #err("Article not found")
      }
    }
  };

  public shared query func getAllArticles() : async [Article] {
    return Iter.toArray(articles.vals())
  };

  public shared func updateArticle(args : Article) : async () {
    articles.put(args.id, args)
  };

  public shared func deleteArticle(arg : Text) : async () {
    articles.delete(arg)
  };

  // -----------------------------------------------------Categories-----------------------------------------------------------------------

  public shared func createCategory(args : Category) : async () {
    categories.put(args.id, args)
  };

  public shared query func getCategory(arg : Text) : async Result.Result<Category, Text> {
    switch (categories.get(arg)) {
      case (?category) {
        return #ok(category)
      };
      case (null) {
        return #err("Category not found")
      }
    }
  };

  public shared query func getAllCategories() : async [Category] {
    return Iter.toArray(categories.vals())
  };

  public shared func updateCategory(args : Category) : async () {
    categories.put(args.id, args)
  };

  public shared func deleteCategory(arg : Text) : async () {
    categories.delete(arg)
  };

  // -----------------------------------------------------Access Control-----------------------------------------------------------------------

  // Determine if a principal has a role with permissions
  func has_permission(pal : Principal, perm : Permission) : Bool {
    let role = get_role(pal);
    switch (role, perm) {
      case (? #owner or ? #admin, _) true;
      case (? #authorized, #lowest) true;
      case (_, _) false
    }
  };

  func principal_eq(a : Principal, b : Principal) : Bool {
    return a == b
  };

  func get_role(pal : Principal) : ?Role {
    if (pal == initializer) {
      ? #owner
    } else {
      AssocList.find<Principal, Role>(roles, pal, principal_eq)
    }
  };

  // Reject unauthorized user identities
  func require_permission(pal : Principal, perm : Permission) : async () {
    if (has_permission(pal, perm) == false) {
      throw Error.reject("unauthorized")
    }
  };

  public shared ({ caller }) func my_role() : async Text {
    let role = get_role(caller);
    switch (role) {
      case (null) {
        return "unauthorized"
      };
      case (? #owner) {
        return "owner"
      };
      case (? #admin) {
        return "admin"
      };
      case (? #staff) {
        return "staff"
      };
      case (? #authorized) {
        return "authorized"
      }
    }
  };

  func isAuthorized(pal : Principal) : Bool {
    let role = get_role(pal);
    switch (role) {
      case (? #owner or ? #admin or ? #authorized) true;
      case (_) false
    }
  };

  func isAdmin(pal : Principal) : Bool {
    let role = get_role(pal);
    switch (role) {
      case (? #owner or ? #admin) true;
      case (_) false
    }
  };

  // Assign a new role to a principal
  public shared ({ caller }) func assign_role(assignee : Principal, new_role : ?Role) : async () {
    await require_permission(caller, #assign_role);

    switch new_role {
      case (? #owner) {
        throw Error.reject("Cannot assign anyone to be the owner")
      };
      case (_) {}
    };
    if (assignee == initializer) {
      throw Error.reject("Cannot assign a role to the canister owner")
    };
    roles := AssocList.replace<Principal, Role>(roles, assignee, principal_eq, new_role).0;
    role_requests := AssocList.replace<Principal, Role>(role_requests, assignee, principal_eq, null).0
  };

}
