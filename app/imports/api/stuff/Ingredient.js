import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/**
 * The IngredientCollection. It encapsulates state and variable values for ingredients.
 */
class IngredientCollection {
  constructor() {
    // The name of this collection.
    this.name = 'IngredientCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      name: String,
      price: String,
      quantity: Number,
      units: String,
      image: String,
      vendor: String,
      owner: String,
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the RecipeCollection.
 * @type {IngredientCollection}
 */
export const Ingredient = new IngredientCollection();
