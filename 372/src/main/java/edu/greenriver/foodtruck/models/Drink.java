package edu.greenriver.foodtruck.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Drink
{
    private String name;
    private boolean caffeinated;
    private boolean sugarFree;
    private int calories;
    private double price;


}
