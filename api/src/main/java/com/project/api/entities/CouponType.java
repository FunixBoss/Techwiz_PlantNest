package com.project.api.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.project.api.dtos.CouponTypeDTO;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 * CouponType generated by hbm2java
 */

@Getter
@Setter
@Entity
@Table(name = "`coupon_type`")
public class CouponType implements java.io.Serializable {

	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "coupon_type_id", unique = true, nullable = false)
	private Integer couponTypeId;

	@Column(name="type_name", nullable=false)
	private String typeName;

	@JsonIgnore
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "couponType")
	private Set<Coupon> coupons = new HashSet<Coupon>(0);

	public CouponType() {
	}

	public CouponType(CouponTypeDTO couponTypeDTO) {
		this.couponTypeId = couponTypeDTO.getCouponTypeId();
		this.typeName = couponTypeDTO.getTypeName();
	}

	public CouponType(String typeName) {
        this.typeName = typeName;
    }

	public CouponType(String typeName, Set<Coupon> coupons) {
       this.typeName = typeName;
       this.coupons = coupons;
    }

}
