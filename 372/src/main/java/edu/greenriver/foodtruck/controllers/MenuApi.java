package edu.greenriver.foodtruck.controllers;

import edu.greenriver.foodtruck.models.Drink;
import edu.greenriver.foodtruck.services.MenuService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.swing.*;
import java.util.List;

@RestController
@RequestMapping("drinks")
public class MenuApi
{
    private MenuService service;

    public MenuApi(MenuService service)
    {
        this.service = service;
    }

    //tested in Postman
    @GetMapping("")
    public List<Drink> allDrinks()
    {
        return service.allDrinks();
    }

    //tested in Postman
    @GetMapping("{drinkName}")
    public ResponseEntity<Drink> drinkByName(@PathVariable String drinkName)
    {
        if (service.findDrinkByName(drinkName) == null)
        {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); //404
        }

        return new ResponseEntity<>(service.findDrinkByName(drinkName), HttpStatus.OK); //200
    }

    @PostMapping("")
    public ResponseEntity<Drink> addDrink(@RequestBody Drink drink)
    {
        if (!service.validDrink(drink))
        {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(service.addDrink(drink), HttpStatus.CREATED);//201
    }

    @PutMapping("")
    public ResponseEntity<Drink> updateDrink(@RequestBody Drink updatedDrink)
    {
        if (service.findDrinkByName(updatedDrink.getName()) == null)
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
    public ResponseEntity<Drink> deleteDrink(@PathVariable String drinkName)
    {
        service.deleteDrink(drinkName);
        if (service.findDrinkByName(drinkName) == null)
        {
            return new ResponseEntity<>(HttpStatus.ACCEPTED); //202
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT); //204
    }
}
