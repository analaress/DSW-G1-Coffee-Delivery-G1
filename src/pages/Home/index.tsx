import { Coffee, Package, ShoppingCart, Timer } from '@phosphor-icons/react'
import { useTheme } from 'styled-components'

import { CoffeeCard } from '../../components/CoffeeCard'

import { CoffeeList, Heading, Hero, HeroContent, Info, Navbar } from './styles'
import { useEffect, useState } from 'react';
import { Radio } from '../../components/Form/Radio';
import { api } from '../../serves/api';

interface Coffee {
  id: string;
  title: string;
  description: string;
  tags: string[];
  price: number;
  image: string;
  quantity: number;
  favorite: boolean;
};

export function Home() {
  const theme = useTheme();
  const [coffees, setCoffees] = useState<Coffee[]>([]);
  const [backup, setBackup] = useState<Coffee[]>([]);
  const [selected, setSelected] = useState<string | null>(null);


  useEffect(() => {
    async function fetchCoffees() {
      const response = await api('/coffees');
      setCoffees([...response.data].sort((a, b) => a.title.localeCompare(b.title)));
    }
    fetchCoffees();
  }, []);


    function selecionaCategoriaTradicional(tipo: string) {
      let filtrados = []

      if (tipo) {
        console.log('coffees', coffees)
        filtrados = coffees.filter((coffee) => 
           coffee.tags.includes(tipo)
        );

        setBackup([...coffees]);
      }
  
      else {
        filtrados = backup;
        console.log('no else', filtrados)

      }
      console.log(filtrados)
  
      setCoffees(filtrados);
      
  }


  useEffect(() => {
    console.log('disparou')
    console.log('selected', selected)
    if (selected) {
      selecionaCategoriaTradicional(selected);
    }

  }, [selected])

  
  function incrementQuantity(id: string) {
    setCoffees((prevState) =>
      prevState.map((coffee) => {
        if (coffee.id === id) {
          return {
            ...coffee,
            quantity: coffee.quantity + 1,
          }
        }
        return coffee
      }
      ),
    );
  }

  
  function decrementQuantity(id: string) {
    setCoffees((prevState) =>
      prevState.map((coffee) => {
        if (coffee.id === id && coffee.quantity > 0) {
          return {
            ...coffee,
            quantity: coffee.quantity - 1,
          }
        }

        return coffee
      }),
    );
  }

  function handleFavoriteCoffee(id: string) {
    setCoffees((prevState) =>
      prevState.map((coffee) => {
        console.log(coffee.favorite)
        if (coffee.id === id) {
          return {
            ...coffee,
            favorite: true,
          }
        }
        return coffee
      }),
    )
  
  }

  return (
    <div>
      <Hero>
        <HeroContent>
          <div>
            <Heading>
              <h1>Encontre o café perfeito para qualquer hora do dia</h1>

              <span>
                Com o Coffee Delivery você recebe seu café onde estiver, a
                qualquer hora
              </span>
            </Heading>

            <Info>
              <div>
                <ShoppingCart
                  size={32}
                  weight="fill"
                  color={theme.colors.background}
                  style={{ backgroundColor: theme.colors['yellow-dark'] }}
                />
                <span>Compra simples e segura</span>
              </div>

              <div>
                <Package
                  size={32}
                  weight="fill"
                  color={theme.colors.background}
                  style={{ backgroundColor: theme.colors['base-text'] }}
                />
                <span>Embalagem mantém o café intacto</span>
              </div>

              <div>
                <Timer
                  size={32}
                  weight="fill"
                  color={theme.colors.background}
                  style={{ backgroundColor: theme.colors.yellow }}
                />
                <span>Entrega rápida e rastreada</span>
              </div>

              <div>
                <Coffee
                  size={32}
                  weight="fill"
                  color={theme.colors.background}
                  style={{ backgroundColor: theme.colors.purple }}
                />
                <span>O café chega fresquinho até você</span>
              </div>
            </Info>
          </div>

          <img src="/images/hero.svg" alt="Café do Coffee Delivery" />
        </HeroContent>

        <img src="/images/hero-bg.svg" id="hero-bg" alt="" />
      </Hero>

      <CoffeeList>

        <h2>Nossos cafés</h2>
        <Navbar>
          <Radio
            onClick={() => {selecionaCategoriaTradicional('tradicional')}}
            isSelected={selected === 'tradicional'}
            value="tradicional"
          >
            <span>Tradicional</span>
          </Radio>
          <Radio
            onClick={() => {selecionaCategoriaTradicional('gelado')}}
            isSelected={selected === 'gelado'}
            value="gelado"
          >
            <span>Gelado</span>
          </Radio>
          <Radio
            onClick={() => {selecionaCategoriaTradicional('com leite')}}
            isSelected={selected === 'com leite'}
            value="com leite"
          >
            <span>Com leite</span>
          </Radio>
        </Navbar>


        <div>
          {coffees.map((coffee) => (
            <CoffeeCard
              key={coffee.id}
              coffee={coffee}
              incrementQuantity={incrementQuantity}
              decrementQuantity={decrementQuantity}
              handleFavoriteCoffee={handleFavoriteCoffee}
            />
          ))}
        </div>
      </CoffeeList>
    </div>
  )
}
