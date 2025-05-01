export enum UserRole {
    SystemAdmin   = 'system_admin',
    CompanyAdmin  = 'company_admin',
    Employer      = 'employer',
    JobSeeker     = 'job_seeker',
}

export enum ProficiencyLevel {
    Beginner      = 'beginner',      // just starting out
    Intermediate  = 'intermediate',  // working experience
    Advanced      = 'advanced',      // deep understanding
    Expert        = 'expert',        // recognized authority
}

export enum ApplicationStatus {
    Applied              = 'applied',
    Viewed               = 'viewed',
    Rejected             = 'rejected',
    InvitedToInterview   = 'invited_to_interview',
    Hired                = 'hired',
}

export enum EducationDegree {
    Specialist    = 'specialist',
    Bachelor      = 'bachelor',
    Master        = 'master',
    PostGraduate  = 'post_graduate',
}

export enum Industry {
    IT             = 'it',
    Finance        = 'finance',
    Healthcare     = 'healthcare',
    Education      = 'education',
    Manufacturing  = 'manufacturing',
    Retail         = 'retail',
    Other          = 'other',
}

export enum InterviewStatus {
    Planned     = 'planned',
    InProgress  = 'in_progress',
    Rejected    = 'rejected',
    Completed   = 'completed',
}

export enum UserActivity {
    Employed        = 'employed',
    LookingForJob   = 'looking_for_job',
    InEducation     = 'in_education',
    OnLeave         = 'on_leave',
    Other           = 'other',
}
