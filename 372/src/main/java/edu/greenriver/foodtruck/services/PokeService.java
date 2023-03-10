package edu.greenriver.foodtruck.services;

import edu.greenriver.foodtruck.models.Pokemon;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PokeService
{
    private List<Pokemon> pokemon = new ArrayList<>(List.of(
            Pokemon.builder()
                    .name("Sunshine")
                    .type("Fairy")
                    .moves(List.of(
                            "tackle", "leer", "screech"
                    ))
                    .stats(List.of(
                            70,50,70,100,100,50
                    ))
                    .build(),
            Pokemon.builder()
                    .name("Moonlight")
                    .type("Dark")
                    .moves(List.of(
                            "tackle", "leer", "screech"
                    ))
                    .stats(List.of(
                            70,50,70,100,100,50
                    ))
                    .build(),
            Pokemon.builder()
                    .name("Sky")
                    .type("Flying")
                    .moves(List.of(
                            "tackle", "leer", "screech"
                    ))
                    .stats(List.of(
                            70,50,70,100,100,50
                    ))
                    .build(),
            Pokemon.builder()
                    .name("Earth")
                    .type("Ground")
                    .moves(List.of(
                            "tackle", "leer", "screech"
                    ))
                    .stats(List.of(
                            70,50,70,100,100,50
                    ))
                    .build()
    ));

    //GET
    public List<Pokemon> allDrinks()
    {
        return pokemon;
    }

    public Pokemon findPokemonByName(String drinkName)
    {
        return pokemon.stream()
                .filter(drink -> drink.getName().equalsIgnoreCase(drinkName))
                .findFirst()
                .orElse(null);
    }

    //POST
    public Pokemon addDrink(Pokemon newDrink)
    {
        pokemon.add(newDrink);
        return newDrink;
    }

    //PUT
    public Pokemon updateDrink(Pokemon updatedPokemon)
    {
        Pokemon foundPokemon = findPokemonByName(updatedPokemon.getName());
        if (foundPokemon != null)
        {
            foundPokemon.setName(updatedPokemon.getName());
            foundPokemon.setType(updatedPokemon.getType());
            foundPokemon.setMoves(updatedPokemon.getMoves());
            foundPokemon.setStats(updatedPokemon.getStats());
        }

        return foundPokemon;
    }

    //DELETE
    public void deletePokemon(String drinkPokemon)
    {
        pokemon = new ArrayList<>(
                pokemon.stream()
                .filter(pokemon -> !pokemon.getName().equalsIgnoreCase(drinkPokemon))
                .toList());
    }

    public boolean validDrink(Pokemon pokemon)
    {
        return pokemon.getName() != null && !pokemon.getName().isEmpty();
    }
}
