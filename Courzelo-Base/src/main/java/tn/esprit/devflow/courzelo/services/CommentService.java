package tn.esprit.devflow.courzelo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.devflow.courzelo.entity.Class;
import tn.esprit.devflow.courzelo.entity.Comment;
import tn.esprit.devflow.courzelo.repository.CommentRepository;

import java.util.List;
import java.util.Optional;
@Service
public class CommentService implements ICommentService{

    @Autowired
    CommentRepository commentRepository;
    @Override
    public List<Comment> retrieveAllComment() {
        return commentRepository.findAll();
    }

    @Override
    public Comment addComment(Comment Comment) {
        return commentRepository.save(Comment);
    }

    @Override
    public Comment updateComment(Comment Comment) {
        return commentRepository.save(Comment);
    }

    @Override
    public void deleteComment(String idComment) {
commentRepository.deleteById(idComment);
    }

    @Override
    public Comment retrieveComm(String idComment) {
        Optional<Comment> commentOptional = commentRepository.findById(idComment);
        return commentOptional.get();
    }


}
