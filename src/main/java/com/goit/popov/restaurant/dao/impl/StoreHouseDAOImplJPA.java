package com.goit.popov.restaurant.dao.impl;

import com.goit.popov.restaurant.dao.entity.StoreHouseDAO;
import com.goit.popov.restaurant.model.Ingredient;
import com.goit.popov.restaurant.model.StoreHouse;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

/**
 * Created by Andrey on 28.10.2016.
 */
@Transactional
public class StoreHouseDAOImplJPA implements StoreHouseDAO {

        private SessionFactory sessionFactory;

        public void setSessionFactory(SessionFactory sessionFactory) {
                this.sessionFactory = sessionFactory;
        }

        @Override
        public int insert(StoreHouse sh) {
                return (int) sessionFactory.getCurrentSession().save(sh);
        }

        @Override
        public void update(StoreHouse sh) {
                sessionFactory.getCurrentSession().update(sh);
        }

        @Override
        public List<StoreHouse> getAll() {
                return sessionFactory.getCurrentSession().createQuery("select e from StoreHouse e").list();
        }

        @Override
        public StoreHouse getById(int id) {
                return sessionFactory.getCurrentSession().get(StoreHouse.class, id);
        }

        @Override
        public void delete(StoreHouse sh) {
                sessionFactory.getCurrentSession().delete(sh);
        }

        @Override
        public List<StoreHouse> getAllRunOut(double threshold) {
                Query query = sessionFactory.getCurrentSession().createQuery("select s from StoreHouse s " +
                        "where s.quantity < :threshold");
                query.setParameter("threshold", threshold);
                return query.list();
        }

        @Override
        public StoreHouse getByIngredient(Ingredient ingredient) {
                Query query = sessionFactory.getCurrentSession().createQuery("select s from StoreHouse s " +
                        "where s.ingredient = :ingredient");
                query.setParameter("ingredient", ingredient);
                return (StoreHouse) query.uniqueResult();
        }


        @Override
        public Double getQuantityByIngredient(Ingredient ingredient) {
                Query query = sessionFactory.getCurrentSession().createQuery("select s.quantity from StoreHouse s " +
                        "where s.ingredient = :ingredient");
                query.setParameter("ingredient", ingredient);
                return (Double) query.uniqueResult();
        }
}
