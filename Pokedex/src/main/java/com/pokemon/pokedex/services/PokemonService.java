package com.pokemon.pokedex.services;

import com.pokemon.pokedex.models.Pokemon;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Xavier Denson
 * @version 17
 */
@Service
public class PokemonService
{
    private List<Pokemon> pokemonList = new ArrayList<>(List.of(
            Pokemon.builder()
                    .name("Zilla")
                    .type("Dark")
                    .moves(List.of(
                            "ember", "tackle", "leer"
                    ))
                    .stats(List.of(
                            50,50,50,50,50,50
                    ))
                    .build()
    ));

    public List<Pokemon> allPokemon() {
        return pokemonList;
}
}
