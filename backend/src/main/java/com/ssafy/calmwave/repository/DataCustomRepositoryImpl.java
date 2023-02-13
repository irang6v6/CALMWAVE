package com.ssafy.calmwave.repository;

import com.querydsl.core.types.ExpressionUtils;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.calmwave.domain.WorkStatus;
import com.ssafy.calmwave.dto.DoneWorkDto;

import com.ssafy.calmwave.dto.QDoneWorkDto;
import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import static com.ssafy.calmwave.domain.QPastWork.*;
import static com.ssafy.calmwave.domain.QWork.*;
import static com.ssafy.calmwave.domain.QWorkCategory.*;
import static com.ssafy.calmwave.domain.QWorkPeriod.*;

public class DataCustomRepositoryImpl implements DataCustomRepository {

    private final JPAQueryFactory queryFactory;

    public DataCustomRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public List<DoneWorkDto> findDoneWorkForToday(Long id) {
        return queryFactory
            .select(new QDoneWorkDto(
                    work.id,
                    work.title,
                    work.description,
                    work.status,
                    work.dateCreated,
                    work.dateFinished,
                    work.dateAimed,
                    work.timeAimed,
                    work.workOrder,
                    ExpressionUtils.as(
                        JPAExpressions.select(
                                Expressions.numberTemplate(Long.class,
                                    "TIME_TO_SEC({0}) - TIME_TO_SEC({1})", workPeriod.endTime,
                                    workPeriod.startTime).sum())
                            .from(workPeriod)
                            .where(workPeriod.work.id.eq(work.id)),
                        "totalTime"),
                ExpressionUtils.as(
                    JPAExpressions.select(
                            workCategory.id
                        )
                        .from(workCategory)
                        .where(workCategory.id.eq(work.workCate.id)),
                    "workCate"),
                    ExpressionUtils.as(
                        JPAExpressions.select(
                                workCategory.cateName
                            )
                            .from(workCategory)
                            .where(workCategory.id.eq(work.workCate.id)),
                        "workCate")
                )
            )
            .from(work)
            .where(
                work.user.id.eq(id),
                work.status.eq(WorkStatus.DONE),
                work.dateFinished.between(
                    calculateStartOfToday(LocalDateTime.now()),
                    calculateEndOfToday(LocalDateTime.now())))
            .orderBy(work.workCate.id.asc())
            .fetch();
    }

    private static LocalDateTime calculateStartOfToday(LocalDateTime now) {
        LocalDateTime midnight = LocalDateTime.of(now.getYear(), now.getMonth(), now.getDayOfMonth(), 0, 0, 0);
        LocalDateTime four = LocalDateTime.of(now.getYear(), now.getMonth(), now.getDayOfMonth(), 4, 0, 0);
        LocalDateTime yesterday = now.minusDays(1);
        if(!now.isBefore(midnight) && !now.isAfter(four))
            return LocalDateTime.of(yesterday.getYear(), yesterday.getMonth(), yesterday.getDayOfMonth(),
                04, 00, 00);
        else
            return LocalDateTime.of(now.getYear(), now.getMonth(), now.getDayOfMonth(),
            04, 00, 00);
    }

    private static LocalDateTime calculateEndOfToday(LocalDateTime now) {
        LocalDateTime midnight = LocalDateTime.of(now.getYear(), now.getMonth(), now.getDayOfMonth(), 0, 0, 0);
        LocalDateTime four = LocalDateTime.of(now.getYear(), now.getMonth(), now.getDayOfMonth(), 4, 0, 0);
        LocalDateTime tomorrow = now.plusDays(1);
        if(!now.isBefore(midnight) && !now.isAfter(four))
            return LocalDateTime.of(now.getYear(), now.getMonth(), now.getDayOfMonth(),
                04, 00, 00);
        else
            return LocalDateTime.of(tomorrow.getYear(), tomorrow.getMonth(),
            tomorrow.getDayOfMonth(), 04, 00, 00);
    }

    @Override
    public List<DoneWorkDto> findDoneWorkForDateRange(Long id, String startDate, String endDate) {
        LocalDate start = LocalDate.of(Integer.valueOf(startDate.substring(0, 4)), Integer.valueOf(startDate.substring(4, 6)), Integer.valueOf(startDate.substring(6, 8)));
        LocalDate end = LocalDate.of(Integer.valueOf(endDate.substring(0, 4)), Integer.valueOf(endDate.substring(4, 6)), Integer.valueOf(endDate.substring(6, 8))).plusDays(1);

        return queryFactory
            .select(new QDoneWorkDto(
                pastWork.id,
                pastWork.title,
                pastWork.description,
                pastWork.status,
                pastWork.dateCreated,
                pastWork.dateFinished,
                pastWork.dateAimed,
                pastWork.timeAimed,
                pastWork.workOrder,
                    ExpressionUtils.as(
                        JPAExpressions.select(
                                Expressions.numberTemplate(Long.class,
                                    "TIME_TO_SEC({0}) - TIME_TO_SEC({1})", workPeriod.endTime,
                                    workPeriod.startTime).sum())
                            .from(workPeriod)
                            .where(workPeriod.pastWork.id.eq(pastWork.id)),
                        "totalTime"),
                    ExpressionUtils.as(
                        JPAExpressions.select(
                                workCategory.id
                            )
                            .from(workCategory)
                            .where(workCategory.id.eq(pastWork.workCate.id)),
                        "workCate"),
                    ExpressionUtils.as(
                        JPAExpressions.select(
                                workCategory.cateName
                            )
                            .from(workCategory)
                            .where(workCategory.id.eq(pastWork.workCate.id)),
                        "workCate")
                )
            )
            .from(pastWork)
            .where(
                pastWork.user.id.eq(id),
                pastWork.status.eq(WorkStatus.DONE),
                pastWork.dateFinished.between(
                    LocalDateTime.of(start.getYear(), start.getMonth(), start.getDayOfMonth(), 04, 00,
                        00),
                    LocalDateTime.of(end.getYear(), end.getMonth(),
                        end.getDayOfMonth(), 04, 00, 00)))
            .orderBy(pastWork.workCate.id.asc())
            .fetch();
    }
}
