package com.ssafy.calmwave.service;

import com.ssafy.calmwave.domain.Posture;
import com.ssafy.calmwave.domain.PostureCName;
import com.ssafy.calmwave.domain.User;
import com.ssafy.calmwave.repository.DataCustomRepositoryImpl;
import com.ssafy.calmwave.repository.PostureRepository;
import com.ssafy.calmwave.repository.WorkPeriodRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class PostureService {

    private final PostureRepository postureRepository;
    private final DataCustomRepositoryImpl dataCustomRepository;
    private final WorkPeriodRepository workPeriodRepository;

    public void save(User user, PostureCName postureCName) {
        Posture posture = new Posture(user, postureCName);
        postureRepository.save(posture);
    }

    public Long countByUserAndPostureCName(User user, PostureCName postureCName) {
        LocalDateTime startOfToday = dataCustomRepository.calculateStartOfToday(LocalDateTime.now());
        Long countPosture = postureRepository.countByUserAndDateCreatedAfterAndCName(user, startOfToday, postureCName);
        Optional<Long> time = workPeriodRepository.findTodayWorkTimeByUserId(user.getId(), startOfToday);
        if (time.isPresent()) {
            Long timeBySec = time.get();
            Long timeByHour=(timeBySec / 3600)==0?1:(timeBySec / 3600);
            return countPosture / (timeByHour);
        } else {
            return null;
        }
    }
}
