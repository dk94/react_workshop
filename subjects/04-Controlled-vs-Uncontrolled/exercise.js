////////////////////////////////////////////////////////////////////////////////
// Exercise
//
// - When the checkbox is checked:
//   - Fill in the shipping fields with the values from billing
//   - Disable the shipping fields so they are not directly editable
//   - Keep the shipping fields up to date as billing fields change
//   - Hint: you can get the checkbox value from `event.target.checked`
// - When the form submits, console.log the values
//
// Got extra time?
//
// - If there are more than two characters in the "state" field, let the user
//   know they should use the two-character abbreviation
// - Save the state of the form and restore it when the page first loads, in
//   case the user accidentally closes the tab before the form is submitted
////////////////////////////////////////////////////////////////////////////////
import React from "react";
import ReactDOM from "react-dom";
import serializeForm from "form-serialize";

class CheckoutForm extends React.Component {
  state={
    isTheSame : false,
    shippingName : '',
    shippingState : '',
    billingName     : '',
    billingState  : ''
  }

  handleChange = (e) => {

    const { target } = e;
 
    if(target.type === 'checkbox')
    this.setState((prevState) => (
      {
        isTheSame : !prevState.isTheSame
      }
    ))

    if(target.type === 'text')
    this.setState(() => (
      {
        [target.name] : target.value
      }
    ))
  }
  
  render() {
    const { isTheSame, billingName, billingState, shippingName, shippingState } = this.state;
    return (
      <div>
        <h1>Checkout</h1>
        <form>
          <fieldset>
            <legend>Billing Address</legend>
            <p>
              <label>
                Billing Name: <input onChange={this.handleChange} name='billingName' value={billingName} type="text" />
              </label>
            </p>
            <p>
              <label>
                Billing State: <input onChange={this.handleChange} name='billingState' value={billingState} type="text" size="2" />
              </label>
            </p>
          </fieldset>

          <br />

          <fieldset>
            <label>
              <input type="checkbox" onChange={this.handleChange} checked={isTheSame} /> Same as billing
            </label>
            <legend>Shipping Address</legend>
            <p>
              <label>
                Shipping Name: <input disabled={isTheSame} name='shippingName' onChange={this.handleChange} value={isTheSame ? billingName  : shippingName} type="text" />
              </label>
            </p>
            <p>
              <label>
                Shipping State: <input disabled={isTheSame} name='shippingState' onChange={this.handleChange} value={isTheSame ? billingState : shippingState} type="text" size="2" />
              </label>
            </p>
          </fieldset>

          <p>
            <button>Submit</button>
          </p>
        </form>
      </div>
    );
  }
}

ReactDOM.render(<CheckoutForm />, document.getElementById("app"));
