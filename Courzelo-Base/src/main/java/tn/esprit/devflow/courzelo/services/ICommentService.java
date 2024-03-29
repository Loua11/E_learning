package tn.esprit.devflow.courzelo.services;

import tn.esprit.devflow.courzelo.entity.Class;
import tn.esprit.devflow.courzelo.entity.Comment;

import java.util.List;

public interface ICommentService {

    public List<Comment> retrieveAllComment();
    public Comment addComment(Comment Comment);
    public Comment updateComment(Comment Comment);
    public void deleteComment(String idComment);
    public Comment retrieveComm (String idComment);
}
