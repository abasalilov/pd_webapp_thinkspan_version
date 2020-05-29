/* eslint-disable import/prefer-default-export */
/* eslint-disable react/sort-comp */
/* eslint-disable class-methods-use-this */
import React from 'react';

const PayPalButton = (props) => {
    const {paypal} =  window;
    return paypal.Button.render({
        env: 'sandbox', // Or 'production', 
        locale: 'de_DE', style: { fundingicons: true, size: 'small', shape: 'rect', color: 'gold' }, funding: {
            allowed: [paypal.FUNDING.CARD, paypal.FUNDING.ELV]
        },
        payment (data, actions) {

            // This function is called when the PayPal button is clicked.  
            // return $('#paypalCartIdDiv').text(); //


        }, onAuthorize (data, actions) {
            // This function is called after the buyer finishes the PayPal flow to authorize the payment
            // Paypal payer ID is returned in data.payerID

            // Send eBay checkout session ID and PayPal payer ID to eBay's updateGuestPaymentInfo to update the checkout session with the Payer ID.
            // Send eBay checkout session ID to placeOrder to submit the payment.
            // For example:
            const redirectUrl = `.../placeorder?payerId=${  data.payerID  }&checkoutSessionId=${data.checkoutSession}).text()}`;
            return actions.redirect(window, redirectUrl);

        }, onCancel (data, actions) { /* * Buyer cancelled the payment */
            // Set Cancel URL. 
            const cancelRedirectUrl = "<your_cancel_page>";
            return actions.redirect(window, cancelRedirectUrl);
        }, onError (err) { /* * An error occurred during the transaction */
            // Set error URL. 
            const errorRedirectUrl = "<your_error_page>";
            return props.actions.redirect(window, errorRedirectUrl);
        }
    }, '#paypal-button');
} 

class Main extends React.Component {

    createOrder(data, actions) {
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: '0.01'
                }
            }]
        });
    }

    onApprove(data, actions) {
        return actions.order.capture();
    }

    render() {
        return (
          <div>
            <PayPalButton />

          </div>
        );
    }
}

export const PayPalBtn = Main;