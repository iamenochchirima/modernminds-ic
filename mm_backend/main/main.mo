import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Text "mo:base/Text";
import TrieMap "mo:base/TrieMap";
import Iter "mo:base/Iter";
import Types "types";

actor {

  type User = Types.User;
  type Article = Types.Article;
  type Category = Types.Category;

  private stable var _stableUsers : [(Principal, User)] = [];
  private stable var _stableArticles : [(Text, Article)] = [];
  private stable var _stableCategories : [(Text, Category)] = [];

  var users = TrieMap.TrieMap<Principal, User>(Principal.equal, Principal.hash);
  var articles = TrieMap.TrieMap<Text, Article>(Text.equal, Text.hash);
  var categories = TrieMap.TrieMap<Text, Category>(Text.equal, Text.hash);

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
  }
}
