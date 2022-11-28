import React, { useEffect, useState } from "react";

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Loading from "../../components/Loading";

const CheckOutForm = ({ product }) => {
  const stripe = useStripe();
  const [cardError, setCardError] = useState("");
  const [success, setSuccess] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const elements = useElements();
  const { price, email, productName, bookId } = product;
  console.log(product);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch(`${process.env.REACT_APP_SERVER}/create-payment-intent`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }
    // eslint-disable-next-line no-unused-vars
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      setCardError(error);
      setIsLoading(true);
    } else {
      setCardError("");
      //   console.log("[PaymentMethod]", paymentMethod);
      //   setSuccess("Payment Completed")
    }
    setSuccess("");
    setIsLoading(true);
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: productName,
            email: email,
          },
        },
      });
    if (confirmError) {
      setCardError(confirmError);
      return;
    }
    if (paymentIntent.status === "succeeded") {
      // payment

      const payment = {
        price,
        transactionId: paymentIntent.id,
        email,
        bookId: bookId,
      };
      //  store payment info to the database

      fetch(`${process.env.REACT_APP_SERVER}/payments`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(payment),
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          if (data.insertedId) {
            setSuccess("Congrats! Your Payment Completed");
            setTransactionId(paymentIntent.id);
          }
        })
        .catch((err) => console.log(err));

      setIsLoading(false);
    }
  };

  if (isLoading) <Loading />;

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        type="submit"
        className="mt-5 w-36 btn btn-outline btn-success"
        disabled={!stripe || !clientSecret || isLoading}
      >
        Pay
      </button>
      {isLoading && <Loading />}
      {cardError && (
        <p className="uppercase text-error text-xl">{cardError.message}</p>
      )}
      {success && (
        <>
          <p className="uppercase text-secondary text-xl">{success}</p>
          <p className="font-bold text-primary text-xl">
            Your TransactionId : {transactionId}
          </p>
        </>
      )}
    </form>
  );
};

export default CheckOutForm;
