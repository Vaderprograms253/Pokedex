package edu.greenriver.foodtruck.controllers;

import edu.greenriver.foodtruck.models.Drink;
import edu.greenriver.foodtruck.services.MenuService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("")
    public List<Drink> allDrinks()
    {
        return service.allDrinks();
    }

    @GetMapping("{drinkName}")
    public Drink drinkByName(@PathVariable String drinkName)
    {
        return service.findDrinkByName(drinkName);
    }

    public void addDrink(@RequestBody Drink drink)
    {
        service.addDrink(drink);
    }

    public void updateDrink(@RequestBody Drink updatedDrink)
    {
        service.updateDrink(updatedDrink);
    }

    @DeleteMapping("{drinkName}")
    public void deleteDrink(@PathVariable String drinkName)
    {
        service.deleteDrink(drinkName);
    }
}
