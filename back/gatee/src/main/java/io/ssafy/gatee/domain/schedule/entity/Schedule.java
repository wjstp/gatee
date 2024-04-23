package io.ssafy.gatee.domain.schedule.entity;

import io.ssafy.gatee.domain.base.BaseEntity;
import io.ssafy.gatee.domain.schedule_record.entity.ScheduleRecord;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLRestriction;
import org.joda.time.DateTime;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@SQLRestriction("status=TRUE")
public class Schedule extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private Category category;

    private String title;

    private String emoji;

    private String content;

    private DateTime startDate;

    private DateTime endDate;

    @OneToOne(mappedBy = "schedule", cascade = CascadeType.ALL)
    private ScheduleRecord scheduleRecord;
}
