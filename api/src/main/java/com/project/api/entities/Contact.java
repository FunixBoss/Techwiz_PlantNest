package com.project.api.entities;
// Generated Jul 25, 2023, 8:08:56 PM by Hibernate Tools 4.3.6.Final

import com.project.api.dtos.WardDTO;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import static javax.persistence.GenerationType.IDENTITY;

/**
 * Contact generated by hbm2java
 */
@Getter
@Setter
@Entity
@Table(name = "`contact`")
public class Contact implements Serializable {

	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "contact_id", unique = true, nullable = false)
	private Integer contactId;

	@Column(name = "full_name")
	private String fullName;

	@Column(name = "phone_number")
	private String phoneNumber;

	@Column(name = "email")
	private String email;

	@Column(name = "subject")
	private String subject;

	@Column(name = "message")
	private String message;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_at", length = 23)
	private Date createdAt;

	public Contact() {}

	public Contact(Integer contactId, String fullName, String phoneNumber, String email, String subject, String message, Date createdAt) {
		this.contactId = contactId;
		this.fullName = fullName;
		this.phoneNumber = phoneNumber;
		this.email = email;
		this.subject = subject;
		this.message = message;
		this.createdAt = createdAt;
	}

	@Override
	public int hashCode() {
		return Objects.hash(contactId);
	}

}
