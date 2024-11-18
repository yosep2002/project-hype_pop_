package org.hype.security.domain;

import java.util.Collection;
import java.util.List;
import org.hype.domain.signInVO;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import lombok.Getter;

@Getter
public class CustomUser extends User {
    private static final long serialVersionUID = 1L;

    private signInVO member;

    // ���� ���� �⺻ ������ �߰�
    public CustomUser() {
        super("default", "default", List.of(new SimpleGrantedAuthority("ROLE_USER")));
        this.member = null; // �⺻ �����ڿ��� member�� null�� �ʱ�ȭ
    }

    // username, password, authorities ��� ������
    public CustomUser(String username, String password, Collection<? extends GrantedAuthority> authorities) {
        super(username, password, authorities);
        this.member = null; // �� �����ڵ� member�� null�� �ʱ�ȭ
    }

    // signInVO ��� ������
    public CustomUser(signInVO vo) {
        super(vo.getUserId(), vo.getUserPw(), vo.getAuth() == 2
                ? List.of(new SimpleGrantedAuthority("ROLE_ADMIN"))
                : List.of(new SimpleGrantedAuthority("ROLE_USER")));
        this.member = vo; // ��ü signInVO ��ü�� ����
    }

    // userNo�� ���� �������� �޼ҵ� �߰�
    public int getUserNo() {
        return this.member != null ? this.member.getUserNo() : -1;
    }
}
