package edu.greenriver.foodtruck.controllers;

import edu.greenriver.foodtruck.models.Pokemon;
import edu.greenriver.foodtruck.services.PokeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("pokemon")
public class MenuApi
{
    private PokeService service;

    public MenuApi(PokeService service)
    {
        this.service = service;
    }

    //tested in Postman
    @GetMapping("")
    public List<Pokemon> allPokemon()
    {
        return service.allDrinks();
    }

    //tested in Postman
    @GetMapping("{pokemonName}")
    public ResponseEntity<Pokemon> pokemonByName(@PathVariable String pokemonName)
    {
        if (service.findPokemonByName(pokemonName) == null)
        {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); //404
        }

        return new ResponseEntity<>(service.findPokemonByName(pokemonName), HttpStatus.OK); //200
    }

    @PostMapping("")
    public ResponseEntity<Pokemon> addPokemon(@RequestBody Pokemon pokemon)
    {
        if (!service.validDrink(pokemon))
        {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(service.addDrink(pokemon), HttpStatus.CREATED);//201
    }

    @PutMapping("")
    public ResponseEntity<Pokemon> updatePokemon(@RequestBody Pokemon updatedDrink)
    {
        if (service.findPokemonByName(updatedDrink.getName()) == null)
        {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); //404
        }

        else if (!service.validDrink(updatedDrink))
        {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST); //400
        }

        return new ResponseEntity<>(service.updateDrink(updatedDrink), HttpStatus.OK);//200
    }

    @DeleteMapping("{drinkName}")
    public ResponseEntity<Pokemon> deleteDrink(@PathVariable String drinkName)
    {
        service.deletePokemon(drinkName);
        if (service.findPokemonByName(drinkName) == null)
        {
            return new ResponseEntity<>(HttpStatus.ACCEPTED); //202
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT); //204
    }
}
