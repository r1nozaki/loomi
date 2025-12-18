package com.loomi.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class ProfileDto {
    private Long id;

    @NotBlank(message = "Name is required")
    private String name;

    @NotNull(message = "Age is required")
    @Min(value = 18, message = "Age must be at least 18")
    private Integer age;

    private String bio;
    private String imageUrl;
    private String telegram;
    private String location;
    private String education;
    private List<String> interests;
    private List<String> genderInterests;
    private String relationships;
    private List<String> photos;
    private String email;
    private Long userId;
}





