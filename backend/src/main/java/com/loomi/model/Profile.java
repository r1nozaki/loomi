package com.loomi.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "profiles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Integer age;

    private String bio;

    private String imageUrl;

    private String telegram;

    private String location;

    private String education;

    @ElementCollection
    @CollectionTable(name = "profile_interests", joinColumns = @JoinColumn(name = "profile_id"))
    @Column(name = "interest")
    @Builder.Default
    private List<String> interests = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "profile_gender_interests", joinColumns = @JoinColumn(name = "profile_id"))
    @Column(name = "gender_interest")
    @Builder.Default
    private List<String> genderInterests = new ArrayList<>();

    private String relationships;

    @ElementCollection
    @CollectionTable(name = "profile_photos", joinColumns = @JoinColumn(name = "profile_id"))
    @Column(name = "photo_url")
    @Builder.Default
    private List<String> photos = new ArrayList<>();

    @OneToOne
    @JoinColumn(name = "user_id", unique = true, nullable = false)
    private User user;
}





