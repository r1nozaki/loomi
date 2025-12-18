package com.loomi.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Setter
@NoArgsConstructor
public class LikeDto {
    @NotNull(message = "Profile ID is required")
    private Long toProfileId;

    private String status; // LIKED or MATCHED
    private Long matchProfileId;
    private String matchProfileName;
    private String telegram;
}





