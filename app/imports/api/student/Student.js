import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/**
 * The StudentCollection. It encapsulates state and variable values for Student.
 */
class StudentCollection {
  constructor() {
    // The name of this collection.
    this.name = 'StudentCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      name: String,
      glutenFree: { type: Boolean, defaultValue: false },
      lactoseFree: { type: Boolean, defaultValue: false },
      vegan: { type: Boolean, defaultValue: false },
      vegetarian: { type: Boolean, defaultValue: false },
      favorites: { type: String, defaultValue: 'null' },
      owner: String,
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.student`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the StudentCollection.
 * @type {StudentCollection}
 */
export const Students = new StudentCollection();
