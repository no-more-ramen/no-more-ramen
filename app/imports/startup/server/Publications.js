import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Stuffs } from '../../api/stuff/Stuff';
import { Recipe } from '../../api/recipe/Recipe';
import { Ingredient } from '../../api/ingredient/Ingredient';
import { Vendors } from '../../api/vendor/Vendor';

// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise publish nothing.
Meteor.publish(Stuffs.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Stuffs.collection.find({ owner: username });
  }
  return this.ready();
});

// Recipe publication
Meteor.publish(Recipe.userPublicationName, function () {
  /*
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Recipe.collection.find({ owner: username });
  }
  return this.ready();
   */
  return Recipe.collection.find();
});

// Ingredient publication
Meteor.publish(Ingredient.userPublicationName, function () {
  /*
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Ingredient.collection.find({ owner: username });
  }
  return this.ready();
   */
  return Ingredient.collection.find();
});

// Vendor publication
Meteor.publish(Vendors.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Vendors.collection.find({ owner: username });
  }
  return this.ready();
});

// Admin-level publication.
// If logged in and with admin role, then publish all documents from all users. Otherwise publish nothing.
Meteor.publish(Stuffs.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Stuffs.collection.find();
  }
  return this.ready();
});

Meteor.publish(Recipe.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Recipe.collection.find();
  }
  return this.ready();
});

Meteor.publish(Ingredient.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Ingredient.collection.find();
  }
  return this.ready();
});

Meteor.publish(Vendors.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'vendor')) {
    return Vendors.collection.find();
  }
  return this.ready();
});

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});

// publish available roles to client, used when setting roles for new users
Meteor.publish(null, function () {
  return Meteor.roles.find({});
});
