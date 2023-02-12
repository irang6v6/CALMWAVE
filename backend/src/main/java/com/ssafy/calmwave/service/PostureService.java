package com.ssafy.calmwave.service;

import com.ssafy.calmwave.domain.Posture;
import com.ssafy.calmwave.domain.PostureCName;
import com.ssafy.calmwave.domain.User;
import com.ssafy.calmwave.repository.PostureRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class PostureService {

    private final PostureRepository postureRepository;

    public void save(User user, PostureCName postureCName) {
        Posture posture=new Posture(user,postureCName);
        postureRepository.save(posture);
    }
}
