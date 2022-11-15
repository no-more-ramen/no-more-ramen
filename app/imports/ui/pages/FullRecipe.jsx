import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import React, { useRef, useState } from 'react';
import { Container, Image, ListGroup, Row, Col } from 'react-bootstrap';
import { CheckCircleFill, XCircleFill, AlarmFill, PersonFill } from 'react-bootstrap-icons';
import { useParams } from 'react-router';
import { Recipe } from '../../api/recipe/Recipe';
import { Ingredient } from '../../api/ingredient/Ingredient';
import LoadingSpinner from '../components/LoadingSpinner';

const FullRecipe = () => {
  const { _id } = useParams();

  const { ready, recipe, ingredients } = useTracker(() => {
    const recipeSubscription = Meteor.subscribe(Recipe.userPublicationName);
    const ingredientSubscription = Meteor.subscribe(Ingredient.userPublicationName);
    // Determine if the subscription is ready
    const rdy = recipeSubscription.ready() && ingredientSubscription.ready();
    // Get the documents
    const recipeItem = Recipe.collection.find({}).fetch() //Recipe.collection.findOne(_id);
    const ingredientItems = Ingredient.collection.find({}).fetch();
    return {
      ready: rdy,
      recipe: recipeItem[0],
      ingredients: ingredientItems,
    };
  }, []);
  const vendorList = useRef();
  const [searchIngredient, setSearchIngredient] = useState("");
  const filteredIngredients = ingredients.filter(ing => ing.name.trim().toLowerCase() === searchIngredient);

  /* Shows a list of vendors that carry an ingredient */
  function showVendors(e) {
    setSearchIngredient(e.target.innerText.toLowerCase());
    vendorList.current.style.display = 'block';
    vendorList.current.style.top = `${e.pageY - 95}px`;
  }

  /* Hides the list of vendors */
  function hideVendors() {
    vendorList.current.style.display = 'none';
  }

  /* Capitalizes the first letter of a string */
  function capitalize(word) {
    return word[0].toUpperCase() + word.slice(1);
  }

  return (ready ? (
    <Container className="py-3">
      <div className="d-flex" style={{ position: 'relative' }}>
        <div>
          <h1>{recipe.name}</h1>
          <Image rounded style={{ alignSelf: 'start' }} width={400} src={recipe.image} />
          <div className="d-flex align-items-center mt-1">
            <AlarmFill className="me-1" /> {recipe.estimatedTime}
            <PersonFill className="ms-3 me-1" /> {recipe.servingSize} {recipe.servingSize === 1 ? 'serving' : 'servings'}
          </div>
          <Row className="mt-3 mb-1">
            <Col md={5} style={{ marginRight: '-30px' }}>
              {
                recipe.glutenFree ?
                  <CheckCircleFill color="green" size={25} /> :
                  <XCircleFill color="red" size={25} />
              } <span>Gluten-free</span> <br />
            </Col>
            <Col>
              {
                recipe.vegan ?
                  <CheckCircleFill color="green" size={25} /> :
                  <XCircleFill color="red" size={25} />
              } <span>Vegan</span> <br />
            </Col>
          </Row>
          <Row>
            <Col md={5} style={{ marginRight: '-30px' }}>
              {
                recipe.lactoseFree ?
                  <CheckCircleFill color="green" size={25} /> :
                  <XCircleFill color="red" size={25} />
              } <span>Lactose-free</span> <br />
            </Col>
            <Col>
              {
                recipe.vegetarian ?
                  <CheckCircleFill color="green" size={25} /> :
                  <XCircleFill color="red" size={25} />
              } <span>Vegetarian</span> <br />
            </Col>
          </Row>
        </div>
        <div className="ms-5" style={{ minWidth: '220px', maxWidth: '220px', wordBreak: 'break-word' }}>
          <h4 className="text-center" style={{ marginTop: '19px' }}><u>Ingredients</u></h4>
          <ListGroup>
            {recipe.ingredientList.split(',').map((recipeIngredient, idx) => (
              <ListGroup.Item
                action
                onMouseEnter={showVendors}
                onMouseLeave={hideVendors}
                key={idx}
              >{capitalize(recipeIngredient.trim())}
              </ListGroup.Item>
            ))}
          </ListGroup>
          <div ref={vendorList} className="border rounded pe-4 pt-3" style={{ position: 'absolute', display: 'none', backgroundColor: 'lightblue', left: 680, wordBreak: 'keep-all', zIndex: 1 }}>
            <ul>
              {
                filteredIngredients.length === 0 ?
                  <p>No vendors currently sell this item</p> :
                  (
                    <div>
                      <span><b>Available at:</b></span>
                      { filteredIngredients.map(ing => <li key={ing._id}>{ing.vendor}: {ing.price}</li>) }
                    </div>
                  )
              }
            </ul>
          </div>
        </div>
        <div className="ms-5">
          <h4 className="text-center" style={{ marginTop: '19px' }}><u>Instructions</u></h4>
          <p className="border rounded px-3 py-2">{recipe.instructions}</p>
        </div>
      </div>
    </Container>
  ) : <LoadingSpinner />);
};

export default FullRecipe;