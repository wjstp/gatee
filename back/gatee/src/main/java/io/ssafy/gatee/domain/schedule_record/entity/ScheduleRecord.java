package io.ssafy.gatee.domain.schedule_record.entity;

import io.ssafy.gatee.domain.schedule.entity.Schedule;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ScheduleRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "schedule_id")
    private Schedule schedule;

    private String content;
}
