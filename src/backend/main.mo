import Map "mo:core/Map";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Array "mo:core/Array";

actor {
  type Product = {
    id : Nat;
    name : Text;
    weight : Text;
    price : Nat;
  };

  type Inquiry = {
    id : Nat;
    name : Text;
    phone : Text;
    productId : Nat;
  };

  type ContactInfo = {
    address : Text;
    phone : Text;
    email : Text;
  };

  let products = Map.empty<Nat, Product>();
  let inquiries = Map.empty<Nat, Inquiry>();
  var nextProductId = 0;
  var nextInquiryId = 0;

  var contactInfo : ?ContactInfo = null;
  var admin : ?Principal = null;

  public shared ({ caller }) func initializeAdmin() : async () {
    if (admin != null) {
      Runtime.trap("Admin already initialized");
    };
    admin := ?caller;
  };

  func checkAdmin(caller : Principal) {
    switch (admin) {
      case (null) { Runtime.trap("Admin not initialized") };
      case (?a) {
        if (a != caller) {
          Runtime.trap("Unauthorized: Only admin can perform this action");
        };
      };
    };
  };

  public shared ({ caller }) func addProduct(name : Text, weight : Text, price : Nat) : async () {
    checkAdmin(caller);
    let product : Product = {
      id = nextProductId;
      name;
      weight;
      price;
    };
    products.add(nextProductId, product);
    nextProductId += 1;
  };

  public shared ({ caller }) func updateProduct(id : Nat, name : Text, weight : Text, price : Nat) : async () {
    checkAdmin(caller);
    switch (products.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?_) {
        let updatedProduct : Product = {
          id;
          name;
          weight;
          price;
        };
        products.add(id, updatedProduct);
      };
    };
  };

  public shared ({ caller }) func deleteProduct(id : Nat) : async () {
    checkAdmin(caller);
    if (products.containsKey(id)) {
      products.remove(id);
    } else {
      Runtime.trap("Product not found");
    };
  };

  public query ({ caller }) func getProducts() : async [Product] {
    products.values().toArray();
  };

  public query ({ caller }) func getContactInfo() : async ContactInfo {
    switch (contactInfo) {
      case (null) { Runtime.trap("Contact info not set") };
      case (?info) { info };
    };
  };

  public shared ({ caller }) func submitInquiry(name : Text, phone : Text, productId : Nat) : async () {
    switch (products.get(productId)) {
      case (null) { Runtime.trap("Product not found") };
      case (?_) {
        let inquiry : Inquiry = {
          id = nextInquiryId;
          name;
          phone;
          productId;
        };
        inquiries.add(nextInquiryId, inquiry);
        nextInquiryId += 1;
      };
    };
  };

  public query ({ caller }) func getInquiries() : async [Inquiry] {
    inquiries.values().toArray();
  };

  public shared ({ caller }) func updateContactInfo(address : Text, phone : Text, email : Text) : async () {
    checkAdmin(caller);
    let info : ContactInfo = {
      address;
      phone;
      email;
    };
    contactInfo := ?info;
  };

  public shared ({ caller }) func initializeDefaultContactInfo() : async () {
    let defaultInfo : ContactInfo = {
      address = "Noida - 201012";
      phone = "9718775129";
      email = "earthvibe@email.com";
    };

    if (contactInfo == null) {
      contactInfo := ?defaultInfo;
    };
  };
};
