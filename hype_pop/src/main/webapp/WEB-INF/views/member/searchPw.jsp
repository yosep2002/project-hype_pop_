<%@ page language="java" contentType="text/html; charset=EUC-KR"
	pageEncoding="EUC-KR"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="EUC-KR">
<title>Insert title here</title>
</head>
<body>
	<h1>��й�ȣ �����ϱ�</h1>

	<input type="hidden" value="2" name="userNo" id="userNo">

	<div id="passwordChangeForm" style="display: block;">
		<div class="modal-content">
			<!-- X ��ư �߰� -->
			<form action="pwChange?userNo=2" method="post"
				id="passwordChangeForm" onsubmit="return submitPwChange()">
				<div class="modal-body">
					<div class="form-group">
						<p>
							<input type="password" class="modal-input" name="oldPw"
								placeholder="���� ��й�ȣ �Է�" required>
						</p>
					</div>
					<div class="form-group">
						<p>
							<input type="password" class="modal-input" name="newPw"
								placeholder="�ű� ��й�ȣ �Է�" required>
						</p>
					</div>
					<div class="form-group">
						<span> <input type="password" class="modal-input"
							name="checkNewPw" placeholder="�ű� ��й�ȣ Ȯ��" required>
						</span>
					</div>
				</div>
				<div class="modal-footer">
					<button type="submit" class="btn btn-sec">��й�ȣ ����</button>
				</div>


			</form>
		</div>
	</div>
	<c:if test="${not empty msg}">
		<script>
        alert("${msg}");
    </script>
	</c:if>

	<script type="text/javascript" src="/resources/memberJs/login.js"></script>

</body>
</html>