'use strict';

/**
 * Imported modules
 */
const mongoose = require('mongoose');
const hash = require('../modules/common.module').hash;

/**
 * User Model
 */
const UserModel = (() => {
    /**
     * Regex
     */
    const usernameRegex = /^[a-z0-9]+$/i;
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const nameRegex = /^[a-z]+$/i;

    /**
     * Model schema
     */
    const schema = {
        avatarUrl: { type: String, trim: true },
        password: { type: String, required: true, min: 6, trim: true },
        isAnAdmin: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
        username_canonical: { type: String, uppercase: true, trim: true },
        email_canonical: { type: String, uppercase: true, trim: true },
        firstName: { 
            type: String, 
            required: true, 
            min: 2,
            trim: true,
            match: [nameRegex, 'First name can only contain letters.'] },
        lastName: { 
            type: String, 
            required: true, 
            min: 2,
            trim: true,
            match: [nameRegex, 'Last name can only contain letters.'] },
        username: {
            type: String,
            required: true,
            index: { unigue: true },
            min: 5,
            trim: true,
            match: [usernameRegex, 'Username can only contain alphanumeric characters.']
        },
        email: {
            type: String,
            required: true,
            index: { unigue: true },
            min: 8,
            trim: true,
            match: [emailRegex, 'Please enter a valid email address']
        }
    };
    
    /**
     * Create Schema
     */
    const UserSchema = new mongoose.Schema(schema);
    
    /**
     * Modify model properties before save.
     */
    UserSchema.pre('save', function (next) {
        
        this.username_canonical = this.username;
        this.email_canonical = this.email;

        if (!this.isModified('password')) {
            return next();
        }

        this.password = hash.generatePasswordHash(this.password);
        
        next();
    });
    
    /**
     * Return user schema
     */
    return UserSchema;
})();

/**
 * Expose
 */
module.exports = mongoose.model('User', UserModel);