import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const syncUser = mutation({
  args: {
    userId: v.string(),
    email: v.string(),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();

    if (!existingUser) {
      await ctx.db.insert("users", {
        userId: args.userId,
        email: args.email,
        name: args.name,
        isPro: false,
      });
    }
  },
});

export const getUser=query({
    args: {userId: v.string() },
    handler:async(ctx,args)=>{
        if(!args.userId)
        {return null;}
        
        const user=await ctx.db.query("users").withIndex("by_user_id").filter((q)=> q.eq(q.field("userId"),args.userId)).first();
        if(!user){return null;}
        return user;
    }

})

export const updateToPro = mutation({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    console.log("the user id is ",args.userId);
    console.log("in the convex logic");
    const user = await ctx.db
      .query("users")
      .withIndex("by_user_id")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();
    console.log("the previous user is ",user);
    if (!user) {
      return null;
    }

    // Persist the update
    await ctx.db.patch(user._id, { isPro: true });
    
    return { success: true };
  },
});
