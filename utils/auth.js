module.exports = {
    isOwner:function(req, res) {
        if (req.session.is_logined) {
            return true;
        } else {
            return false;
        }
    },
    statusUI:function(req, res) {
        let authStatusUI = `<button type="button" onclick="location.href = '/create'">아이디 생성</button>
        <button type="button" onclick="location.href = '/auth'">로그인 </button>`
        if (this.isOwner(req, res)) {
            authStatusUI = `| <a href="/auth/logout">logout</a> |`;
        }
        return authStatusUI;
    }
  }