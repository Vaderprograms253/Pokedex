package com.pokemon.pokedex.controllers;

import com.pokemon.pokedex.models.Pokemon;
import com.pokemon.pokedex.services.PokemonService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 *
 * @author Xavier Denson
 * @version 17
 */
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("pokemon")
public class PokemonAPI
{
    private PokemonService service;

    public PokemonAPI(PokemonService service)
    {
        this.service = service;
    }

    @GetMapping("")
    public List<Pokemon> allPokemon()
    {
        return service.allPokemon();
    }
}
