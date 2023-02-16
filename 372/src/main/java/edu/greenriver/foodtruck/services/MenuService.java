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
                    .price(3.50)
                    .sugarFree(false)
                    .build(),
            Drink.builder()
                    .caffeinated(false)
                    .calories(170)
                    .name("Lemonade")
                    .price(2.00)
                    .sugarFree(false)
                    .build(),
            Drink.builder()
                    .caffeinated(false)
                    .calories(15)
                    .name("Flavored Water")
                    .price(1.00)
                    .sugarFree(true)
                    .build(),
            Drink.builder()
                    .caffeinated(true)
                    .calories(150)
                    .name("Coffee")
                    .price(2.25)
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
                .filter(drink -> drink.getName().equalsIgnoreCase(drinkName))
                .findFirst()
                .orElse(null);
    }

    //POST
    public Drink addDrink(Drink newDrink)
    {
        drinks.add(newDrink);
        return newDrink;
    }

    //PUT
    public Drink updateDrink(Drink updatedDrink)
    {
        Drink foundDrink = findDrinkByName(updatedDrink.getName());
        if (foundDrink != null)
        {
            foundDrink.setCalories(updatedDrink.getCalories());
            foundDrink.setCaffeinated(updatedDrink.isCaffeinated());
            foundDrink.setName(updatedDrink.getName());
            foundDrink.setSugarFree(updatedDrink.isSugarFree());
            foundDrink.setPrice(updatedDrink.getPrice());
        }

        return foundDrink;
    }

    //DELETE
    public void deleteDrink(String drinkName)
    {
        drinks = new ArrayList<>(
                drinks.stream()
                .filter(drink -> !drink.getName().equalsIgnoreCase(drinkName))
                .toList());
    }

    public boolean validDrink(Drink drink)
    {
        return drink.getName() != null && !drink.getName().isEmpty();
    }
}
