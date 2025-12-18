package com.loomi.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "likes", 
       uniqueConstraints = @UniqueConstraint(columnNames = {"from_profile_id", "to_profile_id"}))
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Like {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "from_profile_id", nullable = false)
    private Profile fromProfile;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "to_profile_id", nullable = false)
    private Profile toProfile;
}





