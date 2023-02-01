package edu.greenriver.foodtruck.services;

import edu.greenriver.foodtruck.models.Drink;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MenuService
{
    private List<Drink> drinks = new ArrayList<>(List.of(
            Drink.builder()
                    .caffeinated(true)
                    .calories(300)
                    .name("Cola")
                    .ounces(32)
                    .sugarFree(false)
                    .build(),
            Drink.builder()
                    .caffeinated(false)
                    .calories(170)
                    .name("Lemonade")
                    .ounces(24)
                    .sugarFree(false)
                    .build(),
            Drink.builder()
                    .caffeinated(false)
                    .calories(15)
                    .name("Flavored Water")
                    .ounces(32)
                    .sugarFree(true)
                    .build(),
            Drink.builder()
                    .caffeinated(true)
                    .calories(150)
                    .name("Coffee")
                    .ounces(24)
                    .sugarFree(false)
                    .build()
    ));

    //GET
    public List<Drink> allDrinks()
    {
        return drinks;
    }

    public Drink findDrinkByName(String drinkName)
    {
        return drinks.stream()
                .filter(drink -> drink.getName().equals(drinkName))
                .findFirst()
                .orElse(null);
    }

    //POST
    public void addDrink(Drink newDrink)
    {
        drinks.add(newDrink);
    }

    //PUT
    public void updateDrink(Drink updatedDrink)
    {
        Drink foundDrink = findDrinkByName(updatedDrink.getName());
        if (foundDrink != null)
        {
            foundDrink.setCalories(updatedDrink.getCalories());
            foundDrink.setCaffeinated(updatedDrink.isCaffeinated());
            foundDrink.setName(updatedDrink.getName());
            foundDrink.setSugarFree(updatedDrink.isSugarFree());
            foundDrink.setOunces(updatedDrink.getOunces());
        }
    }

    //DELETE
    public void deleteDrink(Drink deleteDrink)
    {
        drinks = drinks.stream()
                .filter(drink -> !drink.getName().equalsIgnoreCase(deleteDrink.getName()))
                .toList();
    }
}
