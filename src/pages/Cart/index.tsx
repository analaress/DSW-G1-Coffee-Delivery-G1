import { Fragment, useState, useEffect } from 'react'
import {
  Bank,
  CreditCard,
  CurrencyDollar,
  Money,
  Trash,
} from '@phosphor-icons/react'

import {
  CartTotal,
  CartTotalInfo,
  CheckoutButton,
  Coffee,
  CoffeeInfo,
  Container,
  InfoContainer,
  PaymentContainer,
  PaymentErrorMessage,
  PaymentHeading,
  PaymentOptions,
} from './styles'
import { Tags } from '../../components/CoffeeCard/styles';
import { QuantityInput } from '../../components/Form/QuantityInput';
import { Radio } from '../../components/Form/Radio';
import { useCart } from '../../hooks/useCart';

export interface Item {
  id: string
  quantity: number
}
export interface Order {
  id: number
  items: CoffeeInCart[]
}

interface CoffeeInCart {
  id: string;
  title: string;
  description: string;
  tags: string[];
  price: number;
  image: string;
  quantity: number;
  subTotal: number;
} 

const DELIVERY_PRICE = 3.75;

export function Cart() {
  const [coffeesInCart, setCoffeesInCart] = useState<CoffeeInCart[]>([
    {
      id: "0",
      title: "Expresso Tradicional",
      description: "O tradicional café feito com água quente e grãos moídos",
      tags: ["tradicional", "gelado"],
      price: 6.90,
      image: "/images/coffees/expresso.png",
      quantity: 1,
      subTotal: 6.90,
    },
    {
      id: "1",
      title: "Expresso Americano",
      description: "Expresso diluído, menos intenso que o tradicional",
      tags: ["tradicional", "com leite"],
      price: 9.95,
      image: "/images/coffees/americano.png",
      quantity: 2,
      subTotal: 19.90,
    },
    {
      id: "2",
      title: "Expresso Cremoso",
      description: "Café expresso tradicional com espuma cremosa",
      tags: ["especial"],
      price: 16.50,
      image: "/images/coffees/expresso-cremoso.png",
      quantity: 3,
      subTotal: 49.50,
    }
  ]);

  const amountTags: string[] = [];
  
  coffeesInCart.map(coffee => coffee.tags.map((tag) => {
    if (!amountTags.includes(tag)) {
      amountTags.push(tag);
    }
  }));
  
  const totalItemsPrice = coffeesInCart.reduce((currencyValue, coffee) => {
    return currencyValue + coffee.price * coffee.quantity
  }, 0);


  function selecionaCredito() {
    // const filtrados = coffeesInCart.map((coffee) => {
    //   {...coffeesInCart, price: coffeesInCart.price * 1,0385 }
    // });
  
    // setCoffees(filtrados);
  }

  function selecionaDebito() {
    // const filtrados = coffeesInCart.map((coffee) => {
    //   {...coffeesInCart, price: coffeesInCart.price * 1,85 }
    // });
  
    // setCoffees(filtrados);
  }

  function selecionaCash() {
    // const filtrados = coffeesInCart.map((coffee) => {
    //   {...coffeesInCart, price: coffeesInCart.price }
    // });
  
    // setCoffees(filtrados);
  }

  function handleItemIncrement() {
    setCoffeesInCart((prevState) =>
      prevState.map((coffee) => {
        if (coffee.id === id) {
          const coffeeQuantity = coffee.quantity + 1
          const subTotal = coffee.price * coffeeQuantity
          return {
            ...coffee,
            quantity: coffeeQuantity,
            subTotal,
          }
        }
        return coffee
      }),
    )
    
  }

  function handleItemDecrement(itemId: string) {
    setCoffeesInCart((prevState) =>
      prevState.map((coffee) => {
        if (coffee.id === itemId && coffee.quantity > 1) {
          const coffeeQuantity = coffee.quantity - 1;
          const subTotal = coffee.price * coffeeQuantity;
          return {
            ...coffee,
            quantity: coffeeQuantity,
            subTotal,
          }
        }
        return coffee
      }),
    )
  }

  function handleItemRemove(itemId: string) {
    setCoffeesInCart((prevState) =>
      prevState.filter((coffee) => coffee.id !== itemId),
    )
  }

  return (
    <Container>
      

      <InfoContainer>
      <PaymentContainer>
            <PaymentHeading>
              <CurrencyDollar size={22} />

              <div>
                <span>Pagamento</span>

                <p>
                  O pagamento é feito na entrega. Escolha a forma que deseja
                  pagar
                </p>
              </div>
            </PaymentHeading>

            <PaymentOptions>
              <div>
                <Radio
                  isSelected={false}
                  onClick={() => {selecionaCredito}}
                  value="credit"
                >
                  <CreditCard size={16} />
                  <span>Cartão de crédito</span>
                </Radio>

                <Radio
                  isSelected={false}
                  onClick={() => {selecionaDebito}}
                  value="debit"
                >
                  <Bank size={16} />
                  <span>Cartão de débito</span>
                </Radio>

                <Radio
                  isSelected={true}
                  onClick={() => {selecionaCash}}
                  value="cash"
                >
                  <Money size={16} />
                  <span>Pix ou Dinheiro</span>
                </Radio>
              </div>

              {false ? (
                <PaymentErrorMessage role="alert">
                  <span>Selecione uma forma de pagamento</span>
                </PaymentErrorMessage>
              ) : null}
            </PaymentOptions>
          </PaymentContainer>
      </InfoContainer>

      <InfoContainer>
        <h2>Cafés selecionados</h2>

        <CartTotal>
          {coffeesInCart.map((coffee) => (
            <Fragment key={coffee.id}>
              <Coffee>
                <div>
                  <img src={coffee.image} alt={coffee.title} />

                  <div>
                    <span>{coffee.title}</span>
                      <Tags>
                        {coffee.tags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </Tags>

                    <CoffeeInfo>
                      <QuantityInput
                        quantity={coffee.quantity}
                        incrementQuantity={() => handleItemIncrement(coffee.id)}
                        decrementQuantity={() => handleItemDecrement(coffee.id)}
                      />

                      <button onClick={() => handleItemRemove(coffee.id)}>
                        <Trash />
                        <span>Remover</span>
                      </button>
                    </CoffeeInfo>
                  </div>
                </div>

                <aside>R$ {coffee.subTotal?.toFixed(2)}</aside>
              </Coffee>

              <span />
            </Fragment>
          ))}

          <CartTotalInfo>
            <div>
              <span>Total de itens</span>
              <span>
                {new Intl.NumberFormat('pt-br', {
                  currency: 'BRL',
                  style: 'currency',
                }).format(totalItemsPrice)}
              </span>
            </div>

            <div>
              <span>Entrega</span>
              <span>
                {new Intl.NumberFormat('pt-br', {
                  currency: 'BRL',
                  style: 'currency',
                }).format(DELIVERY_PRICE)}
              </span>
            </div>

            <div>
              <span>Total</span>
              <span>
                {new Intl.NumberFormat('pt-br', {
                  currency: 'BRL',
                  style: 'currency',
                }).format(totalItemsPrice + (DELIVERY_PRICE * amountTags.length))}
              </span>
            </div>
          </CartTotalInfo>

          <CheckoutButton type="submit" form="order">
            Confirmar pedido
          </CheckoutButton>
        </CartTotal>
      </InfoContainer>
      {/* <Success /> */}
    </Container>
  )
}
