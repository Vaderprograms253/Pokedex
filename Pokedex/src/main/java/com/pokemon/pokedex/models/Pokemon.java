package com.pokemon.pokedex.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 *
 * @author Xavier Denson
 * @version 17
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Pokemon
{
    private String name;
    private String type;
    private List<Integer> stats;
    private List<String> moves;
}
